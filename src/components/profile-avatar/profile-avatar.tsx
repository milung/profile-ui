import { Component, Prop, h, State } from '@stencil/core';
import md5 from "md5";
import { getUfeRegistryAsync, UfeRegistry} from "ufe-registry"

@Component({
  tag: 'profile-avatar',
  styleUrl: 'profile-avatar.css',
  shadow: true,
})
export class ProfileAvatar {
  /**
   * The avatar email - used to identify user icon 
   */
  @Prop() email: string;

  /**
   * The size of the avatar in pixels
   */
  @Prop() size: string = "64px";

  /**
   * The Uri of the service - md5 hash of the email will be added to this uri
   */
  @Prop({attribute: 'svc'}) avatarsUrl: string;

  @State() private ufeRegistry: UfeRegistry;

  componentWillLoad() {
     getUfeRegistryAsync().then( ufe => this.ufeRegistry = ufe);
  }

  render() {
    let avatar =  undefined
    const userinfo = this.ufeRegistry?.userinfo;
    if( this.email) {
      const hash = md5(this.email);
      avatar = `${this.avatarsUrl}${hash}`;
    } else if(userinfo?.email || userinfo?.id )
    {
      const hash = md5(userinfo?.email || userinfo?.id );
      avatar = `${this.avatarsUrl}${hash}`;
    }
    if(avatar)
    {
      return <img src={avatar} alt="" loading="lazy" style={ {width: this.size, height:this.size} }/>;
    }
    else
    {
      return <mwc-icon>person_off</mwc-icon>
    }
  }
}
