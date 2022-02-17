import { Component, Prop, h } from '@stencil/core';
import md5 from "md5";

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

  render() {
    const id = this.email?.toLowerCase() || (window as any).ufeRegistry?.userId?.toLowerCase();

    if(id)
    {
      const hash = md5(id);
      const url = `${this.avatarsUrl}${hash}`;
      return <img src={url} alt="" loading="lazy" style={ {width: this.size, height:this.size} }/>;
    }
    else
    {
      return <mwc-icon>person_off</mwc-icon>
    }
  }
}
